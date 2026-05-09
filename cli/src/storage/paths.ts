import os from "os";
import path from "path";

export const NETSHIFT_DIR = path.join(os.homedir(), ".netshift");
export const CONFIG_FILE = path.join(NETSHIFT_DIR, "config.json");
export const HISTORY_FILE = path.join(NETSHIFT_DIR, "history.json");
export const PROJECTS_DIR = path.join(NETSHIFT_DIR, "projects");
export const COLLECTIONS_DIR = path.join(NETSHIFT_DIR, "collections");
export const ENVS_DIR = path.join(NETSHIFT_DIR, "envs");
