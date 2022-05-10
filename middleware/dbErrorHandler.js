//handling DB network error
let dbError = false;

export function setDbError() {
  dbError = true;
}
export const dbErrorHandler = (req, res, next) => {
  if (!dbError) {
    next();
  } else {
    res.status(503).json({ error: "Database service unavailable" });
  }
};
