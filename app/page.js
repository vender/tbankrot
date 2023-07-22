import Mainpage from "#/components/mainPage"; 

export const checkEnvironment = () => {
  return process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://3cdev.ru";
};

export default async function Home() {
  const res = await fetch(checkEnvironment().concat('/api/getData'), {
    method: 'GET',
    next: { revalidate: 60 }
  })
  const data = await res.json()

  return (
      <Mainpage data={data} />
  );
}
