import { NextRequest, NextResponse } from "next/server";
import { ObjectStorageService, ObjectNotFoundError } from "@server/replit_integrations/object_storage";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await params;
    const objectPath = `/objects/${path.join("/")}`;
    
    const objectStorageService = new ObjectStorageService();
    const objectFile = await objectStorageService.getObjectEntityFile(objectPath);
    
    const signedUrl = await objectStorageService.getSignedDownloadURL(objectFile, 3600);
    
    return NextResponse.redirect(signedUrl);
  } catch (error) {
    console.error("Error serving object:", error);
    if (error instanceof ObjectNotFoundError) {
      return NextResponse.json({ error: "Object not found" }, { status: 404 });
    }
    return NextResponse.json({ error: "Failed to serve object" }, { status: 500 });
  }
}
