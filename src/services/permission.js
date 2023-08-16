import { forbidden, ok } from "./httpResponses";

export function check(req, permissionName, message="") {
  return req?.session?.account?.permissions?.[permissionName] ? [true, ok()] : [false, forbidden({ message })];
}