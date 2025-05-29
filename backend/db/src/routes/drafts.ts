import { Router } from "express";
import { createDraft, getDrafts } from "../controllers/drafts";
import { approveDraft, rejectDraft } from "../controllers/drafts";

const router = Router();

router.post("/", createDraft);
router.get("/", getDrafts);
// router.put("/:id/approve", approveDraft);
// router.put("/:id/reject", rejectDraft);

export default router;
