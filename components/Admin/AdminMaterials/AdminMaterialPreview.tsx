import MaterialItem from "@/components/Materials/MaterialItem";
import { TMaterial } from "@/types/materials.type";
import HandleEdit from "../HandleEdit";
import AdminMaterialsEdit from "./AdminMaterialEdit";
import DeleteBtn from "@/components/UI/DeleteBtn";
import { deleteMaterial } from "@/lib/actions/materials";

interface AdminMaterialsPreviewProps {
  material: TMaterial;
}
export default function AdminMaterialPreview({
  material,
}: AdminMaterialsPreviewProps) {
  const { imgPath, subject, link,  createdAt, _id } = material;

  return (
    <li className="flex flex-col  gap-2 border-t-8 border-mainGold-500 rounded-base shadow-[0px_4px_8px_#00000026]">
      <MaterialItem material={{ imgPath, subject, link }} />

      <div className="flex  gap-2 items-center p-4">
        <span className="border rounded-base  text-center py-1 px-2 gap-2 flex">
          <p className="text-sm">{new Date(createdAt!).toLocaleDateString()}</p>
        </span>
        <HandleEdit
          item={material}
          EditCmp={({ item }) => (
            <AdminMaterialsEdit
              materialToEdit={{
                ...item,
          
              }}
            />
          )}
        />
        <DeleteBtn id={_id || ""} deleteAction={deleteMaterial} />
      </div>
    </li>
  );
}
