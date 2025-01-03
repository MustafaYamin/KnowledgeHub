'use client'

import { Card, CardContent } from "@/components/ui/card";
import { simpleBlogCard } from "./lib/interface";
import { client } from "./lib/sanity";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function getData() {
  const query = `
*[_type == 'blog'] | order(_createdAt desc) {
  title,
    smallDescription,
    "currentSlug": slug.current,
    "imageUrl":titleImage.asset->url
}`;

  const data = await client.fetch(query);

  return data;
}

export default function Home() {
  const [data, setData] = useState<simpleBlogCard[]>([]);

  useEffect(() => {
    async function fetchData() {
      const result = await getData();
      setData(result);
    }

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2  my-7 sm:px-8 md:px-14  lg:grid-cols-3 gap-4">
      {data.map((post, idx) => {
        return (
          <Card  key={idx}>
            <Image
              src={post.imageUrl}
              alt={post.title}
              width={500}
              height={500}
              className="rounded-lg object-cover h-[200px]"
            />


          <CardContent className="mt-5">
              <h3 className="line-clamp-2mp text-lg font-bold">{post.title}</h3>
              <p className="line-clamp-3 text-sm mt-3 text-gray-600 dark:text-gray-300 ">{post.smallDescription}</p>

              <Button asChild className="w-full  mt-7">
                <Link href={`/blog/${post.currentSlug}`}>Read more</Link>
              </Button>
          </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
