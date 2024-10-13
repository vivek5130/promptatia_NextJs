// "use client"
// import { useState,useEffect } from "react";
// // import { useSession } from "next-auth/react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { Suspense } from 'react'
// import Form from "@components/Form";

// const UpdatePrompt = () => {
//   const router = useRouter();
// //   const { data: session } = useSession();
//   const [submitting, setSubmitting]  = useState(false);
//   const searchParams = useSearchParams();
//   const promptId = searchParams.get('id')
//   const [post, setPost] = useState({
//     prompt: '',
//     tag: ''
//   })

//   useEffect(()=>{
//     const getPromptDetails = async()=>{
//       try{
//         const response = await fetch(`/api/prompt/${promptId}`);
//         const data = await response.json();
//         setPost({
//             prompt : data.prompt,
//             tag : data.tag
//         })
//       }
//       catch(error){
//         console.log("error fetching prompts", error)
//       }
//     }
//     if(promptId) getPromptDetails();
//   },[promptId])

//   const updatePrompt = async(e)=>{
//     e.preventDefault();
//     setSubmitting(true)
//     if (!promptId) return alert("Missing PromptId!");
//     try{
//       const response = await fetch(`/api/prompt/${promptId}`,{
//         method:'PATCH',
//         body: JSON.stringify({
//           prompt: post.prompt,
//           tag: post.tag,
//       })
//       })
//       if(response.ok){
//         router.push('/')
//       }
//     }
//     catch(error){
//       console.log(error)
//     }
//     finally{
//       setSubmitting(false);
//     }
//   }
//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <Form
//         type="Edit"
//         post={post}
//         setPost={setPost}
//         submitting={submitting}
//         handleSubmit={updatePrompt}
//       />
//     </Suspense>
    
//   )
// }

// export default UpdatePrompt


"use client"
import { useState, useEffect, Suspense } from "react";
// import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";

const UpdatePrompt = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const searchParams = useSearchParams();
  const promptId = searchParams ? searchParams.get('id') : null;

  const [post, setPost] = useState({
    prompt: '',
    tag: ''
  });

  useEffect(() => {
    const getPromptDetails = async () => {
      try {
        const response = await fetch(`/api/prompt/${promptId}`);
        const data = await response.json();
        setPost({
          prompt: data.prompt,
          tag: data.tag
        });
      } catch (error) {
        console.log("error fetching prompts", error);
      }
    };
    if (promptId) getPromptDetails();
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    if (!promptId) return alert("Missing PromptId!");
    
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        })
      });
      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {promptId ? (
        <Form
          type="Edit"
          post={post}
          setPost={setPost}
          submitting={submitting}
          handleSubmit={updatePrompt}
        />
      ) : (
        <div>Loading Prompt Details...</div>
      )}
    </Suspense>
  );
};

export default UpdatePrompt;