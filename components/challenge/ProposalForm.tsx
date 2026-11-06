'use client';

import { useEffect, useState } from 'react';
import { Button } from '@ds';
import { readDraft, writeDraft, writePart, type DraftFields } from './participation';

/* Propuesta del challenge (guía de correcciones, ficha 18). Campos en una tarjeta, labels visibles, errores junto al
   campo sin borrar lo escrito. "Guardar borrador" y "Simular entrega" son simulaciones: solo viven en la sesión del
   navegador y el texto lo dice. Nada se envía a ningún servicio. */

type Errors = Partial<Record<keyof DraftFields | 'author', string>>;

export function ProposalForm({ slug, challengeTitle }: { slug: string; challengeTitle: string }) {
  const [draft, setDraft] = useState<DraftFields>({ title: '', problem: '', proposal: '', link: '' });
  const [author, setAuthor] = useState(false);
  const [file, setFile] = useState<string>('');
  const [errors, setErrors] = useState<Errors>({});
  const [notice, setNotice] = useState<string>();

  useEffect(() => {
    const saved = readDraft(slug);
    if (saved) setDraft(saved);
  }, [slug]);

  const set = (k: keyof DraftFields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDraft({ ...draft, [k]: e.target.value });
    if (errors[k]) setErrors({ ...errors, [k]: undefined });
  };

  const validate = () => {
    const next: Errors = {};
    if (!draft.title.trim()) next.title = 'Pon un título a tu propuesta.';
    if (!draft.problem.trim()) next.problem = 'Describe el problema y, si puedes, la evidencia.';
    if (!draft.proposal.trim()) next.proposal = 'Escribe tu propuesta.';
    if (draft.link.trim() && !/^https?:\/\//.test(draft.link.trim())) next.link = 'El enlace debe empezar por http:// o https://.';
    if (!author) next.author = 'Confirma que el trabajo es tuyo para entregarlo.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const saveDraft = () => {
    writeDraft(slug, draft);
    writePart(slug, 'draft');
    setNotice('Simulación: el borrador se guardó solo en esta sesión del navegador. No se ha enviado nada.');
  };

  const simulateSubmit = () => {
    if (!validate()) {
      setNotice(undefined);
      return;
    }
    writeDraft(slug, draft);
    setNotice('Simulación: la entrega no se envía en la demo. El envío real llega con el backend y tu borrador queda guardado en esta sesión.');
  };

  const field = (id: keyof DraftFields, label: string, help: string, multi = false) => (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-xs font-[650] tracking-[0.04em] text-fg-muted uppercase">{label}</label>
      {multi ? (
        <textarea
          id={id}
          value={draft[id]}
          onChange={set(id)}
          rows={5}
          aria-invalid={Boolean(errors[id])}
          aria-describedby={`${id}-help`}
          className="rounded-control border border-line-control bg-surface-card px-3 py-2 text-sm text-fg-body"
        />
      ) : (
        <input
          id={id}
          value={draft[id]}
          onChange={set(id)}
          aria-invalid={Boolean(errors[id])}
          aria-describedby={`${id}-help`}
          className="h-[42px] rounded-control border border-line-control bg-surface-card px-3 text-sm text-fg-body"
        />
      )}
      <p id={`${id}-help`} className="m-0 text-xs text-fg-muted">{help}</p>
      {errors[id] ? <p role="alert" className="m-0 text-xs font-[650] text-status-danger-text">{errors[id]}</p> : null}
    </div>
  );

  return (
    <form
      noValidate
      onSubmit={(e) => e.preventDefault()}
      className="flex flex-col gap-6 rounded-card border border-line-subtle bg-surface-card p-6 md:p-8"
      aria-label={`Propuesta para ${challengeTitle}`}
    >
      {field('title', 'Título de tu propuesta', 'Una frase que diga qué propones.')}
      {field('problem', 'Problema y evidencia', 'Qué problema ves y qué dato lo respalda.', true)}
      {field('proposal', 'Tu propuesta', 'Cómo lo resolverías, en pocas líneas.', true)}
      {field('link', 'Enlace al trabajo o prototipo', 'Opcional. Un enlace público o compartible.')}

      <div className="flex flex-col gap-2">
        <label htmlFor="support" className="text-xs font-[650] tracking-[0.04em] text-fg-muted uppercase">Documento de apoyo</label>
        <input
          id="support"
          type="file"
          accept=".pdf,.png,.jpg,.jpeg"
          aria-describedby="support-help"
          onChange={(e) => setFile(e.target.files?.[0]?.name ?? '')}
          className="text-sm text-fg-body"
        />
        <p id="support-help" className="m-0 text-xs text-fg-muted">
          {file ? `Elegiste ${file}. En la demo el archivo no se sube.` : 'PDF o imagen. En la demo el archivo no se sube.'}
        </p>
      </div>

      <div className="flex flex-col gap-2 border-t border-line-subtle pt-6">
        <label className="flex items-start gap-3 text-sm text-fg-body">
          <input type="checkbox" checked={author} onChange={(e) => { setAuthor(e.target.checked); if (errors.author) setErrors({ ...errors, author: undefined }); }} aria-invalid={Boolean(errors.author)} className="mt-1" />
          Confirmo que el trabajo es mío.
        </label>
        {errors.author ? <p role="alert" className="m-0 text-xs font-[650] text-status-danger-text">{errors.author}</p> : null}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button type="button" variant="secondary" onClick={saveDraft}>Guardar borrador</Button>
        <Button type="button" variant="primary" onClick={simulateSubmit}>Simular entrega</Button>
      </div>
      {notice ? <p role="status" className="m-0 text-xs text-fg-muted">{notice}</p> : null}
    </form>
  );
}
