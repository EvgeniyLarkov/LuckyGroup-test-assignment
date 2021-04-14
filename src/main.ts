import { createPost } from "./components";
import "./styles.css";

export interface PostInterface {
  title: string;
  url: string;
}

export type ServerResponse = PostInterface[];

const fetchData = async (start: number, limit: number) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/photos?_start=${start}&_limit=${limit}`
  );
  return response.json() as Promise<ServerResponse>;
};

function isInViewport(element: HTMLElement) {
  const { top, bottom } = element.getBoundingClientRect();
  const vHeight = window.innerHeight || document.documentElement.clientHeight;

  return (top > 0 || bottom > 0) && top < vHeight;
}

const setScrollHandler = (elem: HTMLElement, cb: () => void) => {
  const handler = () => {
    if (isInViewport(elem)) {
      cb();
      document.removeEventListener("scroll", handler);
    }
  };
  document.addEventListener("scroll", handler);
};

export const main = (): void => {
  let start = 0;
  let limit = 10;

  const queryLimit = new URLSearchParams(document.location.search).get("limit");

  if (queryLimit !== null) {
    if (Number.isInteger(+queryLimit) && +queryLimit > 0) {
      limit = +queryLimit;
    }
  } else {
    const url = new URL(window.location.toString());
    url.searchParams.set("limit", `${limit}`);
    window.history.pushState({}, "", url.toString());
  }

  const root = document.getElementsByTagName("main")[0];

  const handleSetPosts = () => {
    fetchData(start, limit).then((data) => {
      if (root !== null) {
        data.forEach((item, index) => {
          const post = createPost(item);

          if (index === limit - 1) {
            setScrollHandler(post, handleSetPosts);
          }

          root.appendChild(post);
        });

        start += limit;
      }
    });
  };

  handleSetPosts();
};
