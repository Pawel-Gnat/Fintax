import getCurrentCompany from '@/actions/getCurrentCompany';

const Home = async () => {
  const company = await getCurrentCompany();

  return (
    <div>
      <p>{company && company.name}</p>
    </div>
  );
};

export default Home;
