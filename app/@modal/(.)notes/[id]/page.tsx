type Props = {
  params: {
    id: string;
  };
};

export default function ModalNotePage({ params }: Props) {
  return (
    <div>
      <h2>Note ID: {params.id}</h2>
    </div>
  );
}