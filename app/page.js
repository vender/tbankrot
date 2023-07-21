import Mainpage from "#/components/mainPage"; 

export default async function Home() {

  const res = await fetch('http://localhost:3000/api/getData', {
    headers: {
      'Content-Type': 'application/json',
    },
    next: { revalidate: 60 }
  })
  const data = await res.json()

  return (
      <Mainpage data={data} />
  );
}
