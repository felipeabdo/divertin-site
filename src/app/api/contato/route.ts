import { NextResponse } from 'next/server';
import { CONTATO } from '@/data/contatoData';

export const runtime = 'nodejs';

/** Validação simples de formato para o e-mail informado no formulário. */
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** Converte valores do formulário para texto e remove espaços nas extremidades. */
function readTextField(body: Record<string, unknown>, field: string): string {
  const value = body[field];
  return value == null ? '' : String(value).trim();
}

/**
 * Endpoint de contato.
 * Importante: a integração com um provedor de e-mail ainda não está configurada;
 * por isso, os dados são validados e a resposta final permanece HTTP 501.
 */
export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { message: 'O corpo da solicitação precisa ser um JSON válido.' },
      { status: 400 },
    );
  }

  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return NextResponse.json(
      { message: 'Envie os dados do formulário em um objeto JSON.' },
      { status: 400 },
    );
  }

  try {
    const body = payload as Record<string, unknown>;
    const nome = readTextField(body, 'nome');
    const email = readTextField(body, 'email');
    const telefone = readTextField(body, 'telefone');
    const assunto = readTextField(body, 'assunto');
    const mensagem = readTextField(body, 'mensagem');

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

    // Ponto de integração futuro: conectar aqui um serviço transacional, por exemplo
    // Resend ou Nodemailer, usando CONTATO.email como destinatário.
    // Estes campos já estão normalizados e disponíveis para montar a mensagem.
    void telefone;
    void assunto;
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
