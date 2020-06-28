import {
  get,
  post,
  del,
  put
} from "../utils/request";

export function Movies(per = 10, page = 1, sort, category) {
  return get("/api/v1/movies", {
    per,
    page,
    sort,
    category,
  });
}

export function getOneMovie(id) {
  return get("/api/v1/movies/" + id)
}