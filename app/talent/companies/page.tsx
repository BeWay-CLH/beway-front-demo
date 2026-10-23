import { redirect } from 'next/navigation';

/* La ficha de empresa es única y pública (/companies). Si algún día hay exploración personalizada, vive aquí. */
export default function TalentCompanies() {
  redirect('/companies');
}
