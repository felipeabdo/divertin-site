import { NextResponse } from 'next/server';
import { CONTATO } from '@/data/contatoData';

export const runtime = 'nodejs';

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const nome = String(body.nome ?? '').trim();
    const email = String(body.email ?? '').trim();
    const telefone = String(body.telefone ?? '').trim();
    const assunto = String(body.assunto ?? '').trim();
    const mensagem = String(body.mensagem ?? '').trim();

    if (!nome || !email || !mensagem) {
      return NextResponse.json(
        { message: 'Preencha nome, e-mail e mensagem.' },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { message: 'Digite um e-mail válido.' },
        { status: 400 },
      );
    }

    // Estrutura pronta para conectar um provedor de e-mail.
    // Ex.: Resend, SMTP/Nodemailer ou outro serviço transacional.
    // Destinatário: CONTATO.email
    // Os dados validados estão em: nome, email, telefone, assunto e mensagem.
    void CONTATO.email;

    return NextResponse.json(
      {
        message:
          'O formulário está pronto. Falta apenas conectar o provedor de e-mail para concluir o envio automático.',
      },
      { status: 501 },
    );
  } catch {
    return NextResponse.json(
      { message: 'Não foi possível processar sua mensagem.' },
      { status: 500 },
    );
  }
}
