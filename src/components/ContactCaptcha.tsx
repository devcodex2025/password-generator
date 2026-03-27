"use client";

import { useState } from 'react';

type CaptchaCopy = {
  prompt: string;
  question: string;
  label: string;
  placeholder: string;
  submit: string;
  success: string;
  error: string;
};

const CAPTCHA_COPY: Record<string, CaptchaCopy> = {
  en: {
    prompt: 'To protect this contact page from bots, solve the captcha below.',
    question: 'What is {a} + {b}?',
    label: 'Answer',
    placeholder: 'Enter number',
    submit: 'Verify',
    success: 'Verified — contact email unlocked.',
    error: 'Captcha answer is incorrect. Please try again.',
  },
  ua: {
    prompt: "Щоб захистити сторінку контактів від ботів, розв'яжіть капчу.",
    question: 'Скільки буде {a} + {b}?',
    label: 'Відповідь',
    placeholder: 'Введіть число',
    submit: 'Перевірити',
    success: 'Перевірено — електронну адресу розблоковано.',
    error: 'Неправильна відповідь на капчу. Спробуйте ще раз.',
  },
  es: {
    prompt: 'Para proteger esta página de contacto de bots, resuelve la captcha a continuación.',
    question: '¿Cuánto es {a} + {b}?',
    label: 'Respuesta',
    placeholder: 'Introduce un número',
    submit: 'Verificar',
    success: 'Verificado — correo desbloqueado.',
    error: 'Respuesta incorrecta. Inténtalo de nuevo.',
  },
  fr: {
    prompt: 'Pour protéger cette page de contact des bots, résolvez la captcha ci-dessous.',
    question: 'Combien font {a} + {b} ?',
    label: 'Réponse',
    placeholder: 'Entrez un nombre',
    submit: 'Vérifier',
    success: 'Vérifié — e-mail déverrouillé.',
    error: 'Réponse incorrecte. Veuillez réessayer.',
  },
  de: {
    prompt: 'Um diese Kontaktseite vor Bots zu schützen, lösen Sie die Captcha unten.',
    question: 'Wie viel ist {a} + {b}?',
    label: 'Antwort',
    placeholder: 'Geben Sie eine Zahl ein',
    submit: 'Überprüfen',
    success: 'Überprüft — E-Mail freigeschaltet.',
    error: 'Falsche Antwort. Bitte versuchen Sie es erneut.',
  },
  it: {
    prompt: 'Per proteggere questa pagina di contatto dai bot, risolvi il captcha qui sotto.',
    question: 'Quanto fa {a} + {b}?',
    label: 'Risposta',
    placeholder: 'Inserisci un numero',
    submit: 'Verifica',
    success: 'Verificato — email sbloccata.',
    error: 'Risposta errata. Riprova.',
  },
  pt: {
    prompt: 'Para proteger esta página de contato contra bots, resolva o captcha abaixo.',
    question: 'Quanto é {a} + {b}?',
    label: 'Resposta',
    placeholder: 'Digite um número',
    submit: 'Verificar',
    success: 'Verificado — e-mail desbloqueado.',
    error: 'Resposta incorreta. Tente novamente.',
  },
  ru: {
    prompt: 'Чтобы защитить страницу контактов от ботов, решите капчу ниже.',
    question: 'Сколько будет {a} + {b}?',
    label: 'Ответ',
    placeholder: 'Введите число',
    submit: 'Проверить',
    success: 'Проверено — адрес электронной почты разблокирован.',
    error: 'Неправильный ответ. Попробуйте ещё раз.',
  },
  zh: {
    prompt: '为防止机器人滥用此联系页面，请完成下面的验证码。',
    question: '{a} + {b} 等于多少？',
    label: '答案',
    placeholder: '请输入一个数字',
    submit: '验证',
    success: '验证成功 — 电子邮件已解锁。',
    error: '答案不正确。请再试一次。',
  },
  ja: {
    prompt: 'このお問い合わせページをボットから保護するため、以下のキャプチャを解いてください。',
    question: '{a} + {b} はいくつですか？',
    label: '答え',
    placeholder: '数字を入力してください',
    submit: '確認',
    success: '確認済み — メールが表示されました。',
    error: '答えが正しくありません。もう一度試してください。',
  },
  pl: {
    prompt: 'Aby zabezpieczyć tę stronę kontaktową przed botami, rozwiąż poniższą captchę.',
    question: 'Ile to jest {a} + {b}?',
    label: 'Odpowiedź',
    placeholder: 'Wpisz liczbę',
    submit: 'Sprawdź',
    success: 'Zweryfikowano — e-mail odblokowany.',
    error: 'Nieprawidłowa odpowiedź. Spróbuj ponownie.',
  },
};

function normalizeLocale(locale: string) {
  return locale?.trim().toLowerCase().split(/[-_]/)[0] || 'en';
}

function getCaptchaCopy(locale: string): CaptchaCopy {
  const normalized = normalizeLocale(locale);
  return CAPTCHA_COPY[normalized] || CAPTCHA_COPY.en;
}

interface ContactCaptchaProps {
  locale: string;
  email: string;
  emailLabel: string;
}

export default function ContactCaptcha({ locale, email, emailLabel }: ContactCaptchaProps) {
  const copy = getCaptchaCopy(locale);
  const [answer, setAnswer] = useState('');
  const [solved, setSolved] = useState(false);
  const [error, setError] = useState('');
  const [challenge] = useState(() => {
    const left = Math.floor(Math.random() * 8) + 1;
    const right = Math.floor(Math.random() * 8) + 1;
    return { left, right, expected: left + right };
  });

  const question = copy.question
    .replace('{a}', String(challenge.left))
    .replace('{b}', String(challenge.right));

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = parseInt(answer.trim(), 10);

    if (!Number.isFinite(value) || value !== challenge.expected) {
      setError(copy.error);
      return;
    }

    setError('');
    setSolved(true);
  };

  return (
    <div>
      <p className="text-sm sm:text-base text-[#071016] dark:text-white leading-6">{copy.prompt}</p>
      <form onSubmit={handleSubmit} className="mt-4 grid gap-3 sm:flex sm:items-end">
        <div className="min-w-0 flex-1">
          <label className="block text-sm font-medium text-[#071016] dark:text-white">
            {question}
          </label>
          <input
            type="text"
            inputMode="numeric"
            value={answer}
            onChange={(event) => setAnswer(event.target.value)}
            placeholder={copy.placeholder}
            className="mt-2 w-full rounded-xl border border-[#E5F6FF] bg-white px-3 py-2 text-sm text-[#071016] outline-none transition focus:border-[#2A4E63] focus:ring-2 focus:ring-[#E5F6FF] dark:border-[#1F2937] dark:bg-[#0b1220] dark:text-[#F9FAFB]"
          />
        </div>
        <button
          type="submit"
          disabled={solved}
          className="inline-flex items-center justify-center rounded-xl bg-[#2A4E63] px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#1f3b4c] disabled:cursor-not-allowed disabled:bg-[#9CA3AF] dark:bg-[#05a9ff] dark:text-[#16394a] dark:hover:bg-[#38beff]"
        >
          {copy.submit}
        </button>
      </form>

      {error ? (
        <p className="mt-3 text-sm text-red-600 dark:text-red-400">{error}</p>
      ) : null}

      {solved ? (
        <div className="mt-5 rounded-16 bg-[#E5F6FF] dark:bg-[#0b1220] border border-[#E5F6FF] dark:border-[#1F2937] p-4">
          <p className="text-sm font-semibold text-[#2A4E63] dark:text-[#05a9ff]">{copy.success}</p>
          <p className="mt-3 text-sm text-[#071016] dark:text-white">
            <span className="font-semibold text-[#071016] dark:text-white">{emailLabel}: </span>
            <a href={`mailto:${email}`} className="underline underline-offset-4 text-[#2A4E63] dark:text-[#60A5FA]">
              {email}
            </a>
          </p>
        </div>
      ) : null}
    </div>
  );
}
