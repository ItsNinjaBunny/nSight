import { type NextPage } from 'next';
import Head from 'next/head'
import { Navigation } from '../components/navigation/Navigation';

const Dashboard: NextPage = () => {

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="nSight Customer Relations done easy" />
      </Head>
      <Navigation />
      <main className='bg-slate-900 min-h-screen'>

      </main>
    </>
  );
}

export default Dashboard;