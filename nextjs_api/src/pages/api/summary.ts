import type { NextApiRequest, NextApiResponse } from "next";
import { buildSummary, type SummaryResult } from "@/lib/summaryBuilder";

const cache: Record<string, { timestamp: number; data: SummaryResult }> = {};
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { budget_id, categories } = req.query;

    // Validate required query param
    if (!budget_id || typeof budget_id !== "string") {
      return res.status(400).json({ error: "Missing or invalid 'budget_id' param." });
    }

    // Parse optional categories param (e.g., ?categories=groceries,dining%20out)
    const categorySlugs = typeof categories === "string"
      ? categories.split(",").map((s) => s.trim())
      : [];

    const cacheKey = `${budget_id}:${categorySlugs.join(",")}`;
    const now = Date.now();

    if (cache[cacheKey] && now - cache[cacheKey].timestamp < CACHE_DURATION) {
      return res.status(200).json(cache[cacheKey].data);
    }

    const summary = await buildSummary(budget_id, categorySlugs);
    // Cache and return
    cache[cacheKey] = { timestamp: now, data: summary };
    return res.status(200).json(summary);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Summary error:", err.message);
    } else {
      console.error("Unknown error:", err);
    }
    return res.status(500).json({ error: "An unexpected error occurred." });
  }
}
