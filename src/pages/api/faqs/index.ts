import faqs from '@/data/faqs';
import { Faq } from '@/interface/faqs'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = Faq[] | { message: string }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    //Esto se ejecuta del lado del servidor
    if (req.method === 'GET') {
        return res.status(200).json(faqs);
    }

    return res.status(404).json({ message: 'Not Found' })

}