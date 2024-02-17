
"use client";

import Image from "next/image";
import { SignInButton, SignOutButton, UserButton, useSession } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Home() {

  const { isSignedIn } = useSession();
  const createMemePost = useMutation(api.memePost.createMemePost);
  const memePosts = useQuery(api.memePost.getMemePostsForUser)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full flex flex-col font-mono text-sm lg:flex">
        <div className="flex flex-col">
          {isSignedIn ? <><SignOutButton />  <UserButton /></> : <SignInButton />}
          <br />
          {
            isSignedIn && (
              <form
                className="form-horizontal from-inherit"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const formData = new FormData(form);
                  const name = formData.get('name') as string;
                  await createMemePost({ name, userId: '' });
                  form.reset();
                }}
              >
                <label>name</label>
                <input type="text" name="name" className="form-control" placeholder="enter meme name" />
                <button className="btn btn-primary">Create</button>
              </form>

            )
          }
          <ul className="list">
                      </ul>
          {memePosts?.map((memePost) => {
            return <li key={memePost._id} className="post"> {memePost.name} </li>
          })
          }
        </div>
      </div>
    </main>
  );
}
