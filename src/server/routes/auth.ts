// Copyright (C) 2019 ModZero <modzero@modzero.xyz>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

import { db } from "@kredens/server/db";
import express from "express";

const router = express.Router();

router.get("/", async (req, res, next) => {
  res.render("login");
});

router.post("/", async (req, res, next) => {
  const userID = await db.users.login(req.body.email, req.body.password);
  if (userID.isSome()) {
    req.session.userID = userID.some();
    res.redirect("/");
  } else {
    res.redirect("/auth/");
  }
});

export default router;