import http from "k6/http";
import { check } from "k6";

export const options = {
  vus: 100,
  duration: "5m"
};

export default function() {
  const random = Math.random();
  let flip = Math.floor(random * 4);
  let id = flip === 0 ?  Math.floor(random * 10000000) : Math.floor(random * 10000) + 1;
  let res = http.get(`http://localhost:3003/${id}/menus`);
  check(res, {
    "status was 200": (r) => r.status == 200,
  });
};
