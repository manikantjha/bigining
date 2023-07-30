import ConfirmDeleteModal from "@/components/common/ConfirmDeleteModal";
import { GetIcon } from "@/components/common/icons/icons";
import { deleteArtist } from "@/services/apiServices";
import { IArtist } from "@/types/artists";
import { truncateText } from "@/utils/helpers";
import { useRouter } from "next/router";
import { useState } from "react";
import { UseQueryResult, useMutation } from "react-query";
import AddNewButton from "../common/AddNewButton";
import CommonButton from "../common/CommonButton";

interface IArtistsListProps {
  artists: UseQueryResult<any, unknown>;
}

export default function ArtistsList(props: IArtistsListProps) {
  console.log("artists", props.artists);
  const router = useRouter();
  const deleteArtsitMutation = useMutation("deleteArtist", (data: IArtist) =>
    deleteArtist(data)
  );
  const [isOpen, setIsOpen] = useState(false);
  const [artist, setArtist] = useState<IArtist | null>(null);

  function onClose() {
    setIsOpen(false);
  }

  function onConfirm() {
    if (artist)
      deleteArtsitMutation.mutate(artist, {
        onSettled() {
          setIsOpen(false);
          props.artists.refetch();
        },
      });
  }

  const data = props.artists?.data?.artists || [];

  return (
    <div>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AddNewButton
          herf="artists/add"
          router={router}
          text="Add New Artist"
        />
        {!!data.length &&
          data.map((artist: IArtist) => (
            <div
              key={artist._id}
              className="border p-4 rounded-lg grid grid-rows-[auto_1fr_auto] gap-4 h-[400px]"
            >
              <div>
                <h3 className="text-lg font-semibold">{artist.name}</h3>
                {artist.description && (
                  <p className="text-gray-500">
                    {truncateText(artist.description, 120)}
                  </p>
                )}
              </div>
              <div className="h-[200px] overflow-hidden border-2 border-dashed rounded-md bg-gray-50">
                <img
                  src={artist?.image?.medium?.url || ""}
                  alt={artist.name}
                  className="w-full h-full rounded object-cover"
                />
              </div>
              <div className="flex space-x-2 mt-2">
                <CommonButton
                  onClick={() => router.push(`artists/${artist._id}`)}
                  color="primary"
                  variant="outlined"
                  className="w-fit h-fit"
                  icon={<GetIcon name="edit" size="w-5 h-5" />}
                >
                  Edit
                </CommonButton>
                <CommonButton
                  onClick={() => {
                    setArtist(artist);
                    setIsOpen(true);
                  }}
                  color="accent"
                  className="w-fit h-fit"
                  variant="outlined"
                  icon={<GetIcon name="delete" size="w-5 h-5" />}
                >
                  Delete
                </CommonButton>
              </div>
            </div>
          ))}
      </div>
      <ConfirmDeleteModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={onConfirm}
      />
    </div>
  );
}