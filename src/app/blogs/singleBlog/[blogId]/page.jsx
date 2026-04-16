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
    return { title: 'Blog | Eevagga' };
  }
}

export default function Page({ params }) {
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "publisher": {
      "@type": "Organization",
      "@id": "https://www.eevagga.com/#organization",
      "name": "Evaga Entertainment"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema).replace(/</g, '\\u003c') }}
      />
      <Suspense fallback={null}>
        <PageComponent />
      </Suspense>
    </>
  );
}