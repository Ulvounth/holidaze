import { NextResponse } from "next/server";
import { createAuthHeaders } from "@/app/lib/createAuthHeaders";
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
  } catch (error) {
    console.error("Error deleting booking:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
