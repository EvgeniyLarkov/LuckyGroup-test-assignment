import type { PostInterface } from "./main";

export const createPost = (post: PostInterface): HTMLElement => {
  const postEl = document.createElement("article");
  postEl.innerHTML = `<h3>${post.title.toUpperCase()}</h3><img src="${
    post.url
  }" alt="${post.title}">`;

  return postEl;
};
