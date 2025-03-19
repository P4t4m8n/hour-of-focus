import ArticlesList from "@/components/Home/Articles/ArticlesList";
import { getArticles } from "@/lib/actions/articles";
import { cache } from "react";

const cachedGetArticles = cache(getArticles);

export default async function HomeArticlePage() {
  const articles = await cachedGetArticles(false);
  return <ArticlesList articles={articles} />;
}
