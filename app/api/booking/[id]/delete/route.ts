import { NextResponse } from "next/server";
import { createAuthHeaders } from "@/app/lib/utils/createAuthHeaders";
import { deleteBooking } from "@/app/lib/services/booking/deleteBooking";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const headers = await createAuthHeaders();
    const bookingId = params.id;

    await deleteBooking(bookingId, headers);

    return new Response(null, { status: 204 });
  } catch (error: any) {
    console.error("Error deleting booking:", error);

    return NextResponse.json(
      {
        message: error.message || "Internal Server Error",
        errors: error.errors || [],
      },
      { status: 500 }
    );
  }
}
