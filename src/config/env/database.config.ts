import { env } from "../config";

const { PGHOST, PGUSER, PGDATABASE, PGPASSWORD, PGPORT } = env;

export default {
  PGHOST,
  PGUSER,
  PGDATABASE,
  PGPASSWORD,
  PGPORT,
};
