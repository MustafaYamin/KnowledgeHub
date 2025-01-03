"use client";

import { fullBlog } from "@/app/lib/interface";
import { client } from "../../lib/sanity";
import { useEffect, useState } from "react";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import Comments from "@/app/components/Comments";

async function getData(slug: string) {
  const query = `
    *[_type == 'blog' && slug.current == '${slug}']{
    "currentSlug": slug.current,
    title,
    content,
    "imageUrl":titleImage.asset->url
    }`;

  const data = await client.fetch(query);
  console.log("Fetched data:", data);

  return data;
}

export default function BlogArticle({ params }: { params: { slug: string } }) {
  const [article, setArticle] = useState<fullBlog[]>([]);

  useEffect(() => {
    async function fetchData() {
      const result = await getData(params.slug);
      setArticle(result);
    }

    fetchData();
  }, [params.slug]);

  return (
    <div> 
      {article.map((blog, idx) => {
        return (
          <div
            className="flex mb-7 items-center px-1 sm:px-8 md:px-14 my-4 flex-col gap-3"
            key={idx}
          >
            <span className="text-primary text-lg tracking-wide font-normal ">
              Knowledge-Hub
            </span>
            <div>
              <div className="flex items-center justify-center mb-3">

              <h1 className="font-bold self-center tracking-wider mt-5  text-4xl">
                {blog.title}
              </h1>
              </div>

<div className="w-[63vw] flex justify-center items-center">

              <Image
                src={blog.imageUrl}
                alt={blog.title}
                width={100}
                height={100}
                className="w-[60vw] self-center mt-5 h-auto bg-cover rounded-md"
                />
                </div>

              <div className="flex items-center justify-center ">
                <p className="w-[65vw] mt-5 text-wrap tracking-wide leading-9 ">
                  <PortableText value={blog.content} />
                </p>
              </div>
            </div>
            <Comments/>
          </div>
        );
      })}
    </div>
  );
}
