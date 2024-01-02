import { NextApiRequest } from 'next';
import { getToken } from 'next-auth/jwt';

export async function getAuthToken(req: NextApiRequest) {
    const token = await getToken({ req });
    return token;
}