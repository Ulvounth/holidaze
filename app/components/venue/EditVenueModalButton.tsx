import { useState } from "react";
import Modal from "../ui/Modal";
import { useAuth } from "@/app/lib/context/authContext";
import { Venue } from "@/app/lib/types";
import UpdateVenueForm from "./UpdateVenue";
import DeleteVenueButton from "./DeleteVenue";

type EditVenueModalButtonProps = {
  venue: Venue;
};

const EditVenueModalButton = ({ venue }: EditVenueModalButtonProps) => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!user) {
    return null;
  }

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        className="flex-grow p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleOpenModal}
      >
        Edit Venue
      </button>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <UpdateVenueForm venue={venue} onSuccess={handleCloseModal} />

          <DeleteVenueButton venueId={venue.id} onClose={handleCloseModal} />
        </Modal>
      )}
    </>
  );
};

export default EditVenueModalButton;
