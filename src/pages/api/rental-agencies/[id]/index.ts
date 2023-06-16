import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { rentalAgencyValidationSchema } from 'validationSchema/rental-agencies';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.rental_agency
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getRentalAgencyById();
    case 'PUT':
      return updateRentalAgencyById();
    case 'DELETE':
      return deleteRentalAgencyById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getRentalAgencyById() {
    const data = await prisma.rental_agency.findFirst(convertQueryToPrismaUtil(req.query, 'rental_agency'));
    return res.status(200).json(data);
  }

  async function updateRentalAgencyById() {
    await rentalAgencyValidationSchema.validate(req.body);
    const data = await prisma.rental_agency.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });
    if (req.body.name) {
      await roqClient.asUser(roqUserId).updateTenant({ id: user.tenantId, tenant: { name: req.body.name } });
    }
    return res.status(200).json(data);
  }
  async function deleteRentalAgencyById() {
    const data = await prisma.rental_agency.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
