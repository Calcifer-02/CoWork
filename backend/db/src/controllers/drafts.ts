import type { Request, Response } from "express";
import { query } from "../db";

export const createDraft = async (req: Request, res: Response) => {
   try {
      const result = await query(
         `INSERT INTO drafts (country, region, city, inn, abbreviation, 
       name, full_name, juridical_address, actual_address, phone, 
       email, website, coworking_type)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
       RETURNING *`,
         Object.values(req.body)
      );
      res.status(201).json(result.rows[0]);
   } catch (error) {
      console.error("Error creating draft:", error);
      res.status(500).json({ error: "Internal server error" });
   }
};

export const getDrafts = async (req: Request, res: Response) => {
   try {
      const status = req.query.status as string | undefined;
      let queryStr = "SELECT * FROM drafts";
      const params: string[] = [];

      if (status) {
         queryStr += " WHERE status = $1";
         params.push(status);
      }

      queryStr += " ORDER BY created_at DESC";
      const result = await query(queryStr, params);
      res.json(result.rows);
   } catch (error) {
      console.error("Error fetching drafts:", error);
      res.status(500).json({ error: "Internal server error" });
   }
};

export const approveDraft = async (req: Request, res: Response) => {
   try {
      // 1. Получаем черновик
      const draftResult = await query("SELECT * FROM drafts WHERE id = $1", [
         req.params.id,
      ]);
      if (draftResult.rows.length === 0) {
         return res.status(404).json({ error: "Draft not found" });
      }

      const draft = draftResult.rows[0];

      // 2. Создаем коворкинг
      const coworkingResult = await query(
         `INSERT INTO coworking_spaces 
       (country, region, city, inn, abbreviation, name, full_name, 
        juridical_address, actual_address, phone, email, website, coworking_type)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
       RETURNING *`,
         [
            draft.country,
            draft.region,
            draft.city,
            draft.inn,
            draft.abbreviation,
            draft.name,
            draft.full_name,
            draft.juridical_address,
            draft.actual_address,
            draft.phone,
            draft.email,
            draft.website,
            draft.coworking_type,
         ]
      );

      // 3. Обновляем статус черновика
      await query("UPDATE drafts SET status = $1 WHERE id = $2", [
         "approved",
         req.params.id,
      ]);

      res.json(coworkingResult.rows[0]);
   } catch (error) {
      console.error("Error approving draft:", error);
      res.status(500).json({ error: "Internal server error" });
   }
};

export const rejectDraft = async (req: Request, res: Response) => {
   try {
      const result = await query(
         "UPDATE drafts SET status = $1 WHERE id = $2 RETURNING *",
         ["rejected", req.params.id]
      );

      if (result.rows.length === 0) {
         return res.status(404).json({ error: "Draft not found" });
      }

      res.json(result.rows[0]);
   } catch (error) {
      console.error("Error rejecting draft:", error);
      res.status(500).json({ error: "Internal server error" });
   }
};
