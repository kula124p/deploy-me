export default function BlogPost(props) {
  console.log(props);
  const params = props.params;
  return (
    <main className="flex min-h-screen flex-col items-center p-10">
      <h1 className="text-6xl font-extrabold tracking-tight">
        Blog Post: {params.id}
      </h1>
    </main>
  );
}
