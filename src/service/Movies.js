import {
  get,
  post,
  del,
  put
} from "../utils/request";

export function Movies(per = 10, page = 1, sort, category, name) {
  return get("/api/v1/movies", {
    per,
    page,
    sort,
    category,
    name
  });
}
// 按名字查找
export function MoviesSearch(per = 10, page = 1, sort, name) {
  return get("/api/v1/movies", {
    per,
    page,
    sort,
    name
  });
}

export function getOneMovie(id) {
  return get("/api/v1/movies/" + id)
}