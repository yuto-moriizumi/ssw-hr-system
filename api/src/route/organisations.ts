import express from 'express';
import { AppDataSource } from '../data-source';
import Department from '../model/Department';
import Organisation from '../model/Organisation';
import User from '../model/User';

const organisationsRouter = express.Router();

organisationsRouter.get('/organizations', async (req, res) => {
  if (!AppDataSource.isInitialized) await AppDataSource.initialize();
  const { manager } = AppDataSource;
  const { type } = req.query;
  if (type === 'list') {
    res.status(200).send(
      await manager.find(Organisation, {
        relations: ['boss_role', 'member_role'],
      })
    );
    return;
  }
  const orgs = await manager.getTreeRepository(Organisation).findTrees({
    relations: ['boss_role', 'member_role'],
  });
  const users = await manager.find(User);
  const root = orgs[0];
  users.filter((u) => u.isAlive()).forEach((u) => root.sinkUser(u));
  res.status(200).send(root);
});

organisationsRouter.post('/organizations', async (req, res) => {
  if (!AppDataSource.isInitialized) await AppDataSource.initialize();
  const { manager } = AppDataSource;

  const { name, super_org_id, boss_role_id, member_role_id } = req.body;
  const org = new Organisation();
  org.name = name;
  org.boss_role = new Department(boss_role_id);
  org.member_role = new Department(member_role_id);

  const superOrg = new Organisation();
  superOrg.id = super_org_id;
  org.super = superOrg;

  res.status(200).send(await manager.save(org));
});

export default organisationsRouter;
