import app from "../app.js";

import { adminRouter } from "./admin.routes.js";

app.route('/admin', adminRouter);