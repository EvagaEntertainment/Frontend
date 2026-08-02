import { Suspense } from 'react';
import PageComponent from '../../../../pages/singleBlogPage';

export async function generateMetadata({ params }) {
  const { blogId } = params;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}blog/get-one-blog/${blogId}`,
      { next: { revalidate: 3600 } }
    );
    const data = await res.json();
    const blog = data?.data;
    const title = blog?.title || 'Blog | Eevagga';
    const description = blog?.excerpt || blog?.content?.slice(0, 155) || "Read the latest event planning tips and inspiration on Eevagga.";
    const image = blog?.coverImage
      ? `${process.env.NEXT_PUBLIC_API_Aws_Image_BASE_URL}${blog.coverImage}`
      : 'https://www.eevagga.com/og-image.jpg';

    return {
      title,
      description,
      alternates: { canonical: `https://www.eevagga.com/blogs/singleBlog/${blogId}` },
      openGraph: {
        title,
        description,
        type: 'article',
        url: `https://www.eevagga.com/blogs/singleBlog/${blogId}`,
        images: [{ url: image, width: 1200, height: 630 }],
        publishedTime: blog?.createdAt,
        modifiedTime: blog?.updatedAt,
      },
      twitter: { card: 'summary_large_image', title, description, images: [image] },
    };
  } catch {
    return { title: 'Blog' };
  }
}

export default async function Page({ params }) {
  const { blogId } = params;

  let blog = null;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}blog/get-one-blog/${blogId}`,
      { next: { revalidate: 3600 } }
    );
    const data = await res.json();
    blog = data?.data;
  } catch {}

  const image = blog?.coverImage
    ? `${process.env.NEXT_PUBLIC_API_Aws_Image_BASE_URL}${blog.coverImage}`
    : 'https://www.eevagga.com/og-image.jpg';

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `https://www.eevagga.com/blogs/singleBlog/${blogId}#article`,
    "url": `https://www.eevagga.com/blogs/singleBlog/${blogId}`,
    ...(blog?.title ? { "headline": blog.title.slice(0, 110) } : {}),
    ...(blog?.excerpt || blog?.content ? { "description": (blog.excerpt || blog.content.slice(0, 155)) } : {}),
    "image": image,
    ...(blog?.createdAt ? { "datePublished": blog.createdAt } : {}),
    ...(blog?.updatedAt ? { "dateModified": blog.updatedAt } : {}),
    "inLanguage": "en-IN",
    "author": blog?.authorName
      ? { "@type": "Person", "name": blog.authorName }
      : { "@type": "Organization", "name": "Eevagga Editorial Team", "@id": "https://www.eevagga.com/#organization" },
    "publisher": { "@id": "https://www.eevagga.com/#organization" },
    "isPartOf": { "@id": "https://www.eevagga.com/blogs#blog" }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.eevagga.com" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.eevagga.com/blogs" },
      { "@type": "ListItem", "position": 3, "name": blog?.title || "Article", "item": `https://www.eevagga.com/blogs/singleBlog/${blogId}` }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema).replace(/</g, '\\u003c') }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c') }}
      />
      <Suspense fallback={null}>
        <PageComponent initialBlog={blog} />
      </Suspense>
    </>
  );
}
