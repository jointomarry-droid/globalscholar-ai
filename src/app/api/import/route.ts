import { NextRequest, NextResponse } from "next/server";
import { getImportEngine } from "@/services/import.service";
import { getSearchService } from "@/services/search.service";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const source = formData.get("source") as string || "csv-import";
    const format = formData.get("format") as string || "csv";

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 }
      );
    }

    const importEngine = getImportEngine();
    let result;

    switch (format) {
      case "csv":
        result = await importEngine.importFromCSV(file, { source, format: "csv" });
        break;
      case "json":
        const text = await file.text();
        result = await importEngine.importFromJSON(text, { source, format: "json" });
        break;
      default:
        return NextResponse.json(
          { success: false, error: `Unsupported format: ${format}` },
          { status: 400 }
        );
    }

    // Detect duplicates
    const duplicates = await importEngine.detectDuplicates(result.scholarships);
    const uniqueScholarships = result.scholarships.filter(
      (s) => !duplicates.find((d) => d.title === s.title)
    );

    // Index in search engine
    try {
      const searchService = getSearchService();
      await searchService.indexScholarships(uniqueScholarships);
    } catch (e) {
      console.error("Search indexing failed:", e);
    }

    return NextResponse.json({
      success: true,
      data: {
        job: result.job,
        totalProcessed: result.scholarships.length,
        uniqueCount: uniqueScholarships.length,
        duplicateCount: duplicates.length,
        errors: result.errors,
      },
    });
  } catch (error) {
    console.error("Import error:", error);
    return NextResponse.json(
      { success: false, error: "Import failed" },
      { status: 500 }
    );
  }
}
