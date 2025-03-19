import HandleEdit from "../HandleEdit";
import DeleteBtn from "@/components/UI/DeleteBtn";
import { TArticle } from "@/types/articles.type";
import ArticleItem from "@/components/Home/Articles/ArticleItem";
import AdminArticleEdit from "./AdminArticleEdit";
import { deleteArticle } from "@/lib/actions/articles";

interface AdminArticlePreviewProps {
  article: TArticle;
}
export default function AdminArticlePreview({
  article,
}: AdminArticlePreviewProps) {
  const { publishDate, link, preview, publishPlace, createAt, _id } =
  article;

  return (
    <li className="p-4 border rounded-base">
      <ul>
        <ArticleItem
          publishDate={publishDate}
          link={link}
          preview={preview}
          publishPlace={publishPlace}
        />
        <li className="flex  gap-2 items-center p-4">
          <span className="border rounded-base  text-center py-1 px-2 gap-2 flex">
            <p className="text-sm">
              {new Date(createAt!).toLocaleDateString()}
            </p>
          </span>
          <HandleEdit
            item={article}
            EditCmp={({ item }) => (
              <AdminArticleEdit
                articleToEdit={{
                  ...item,
                  createBy: item?.createBy?._id,
                  updateBy: item?.updateBy?._id,
                }}
              />
            )}
          />
          <DeleteBtn id={_id || ""} deleteAction={deleteArticle} />
        </li>
      </ul>
    </li>
  );
}
