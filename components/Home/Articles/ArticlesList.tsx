"use client";
import { TArticle } from "@/types/articles.type";
import ItemsScroll from "../../UI/ItemsScroll";
import ArticleItem from "./ArticleItem";

interface ArticleItemProps{
  articles:TArticle[]
}

export default function ArticlesList( {articles}:ArticleItemProps) {
  return (
    <div className="h-fit w-full lg:px-sides-sm px-sides flex flex-col items-center justify-center justify-items-center home-layout-articles">
      <h4 className="pb-8 text-24 lg:text-36">כתבו עלינו</h4>
      <ItemsScroll<{
        publishPlace: string;
        preview: string;
        publishDate: string;
        link: string;
      }>
        items={articles}
        renderItem={(article) => <ArticleItem {...article} />}
      />
    </div>
  );
}

