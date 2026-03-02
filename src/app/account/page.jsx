export default function Home() {
  return (
    // Page wrapper
    <main className="dashboard"> 
        <h1 className="dashboardTitle">Account</h1>
        
      <section className="account-grid" aria-label="account overview">
        {/* DASHBOARD SECTION */}
        <div className="streak">
          <div className="heroText">
            <h1>Streak</h1>
          </div>
        </div>

        <div className="platinum-quizzes">
            <div>
                <h1>Platinum Quizzes</h1>
            </div>
        </div>

        <div className="learner-level">
            <div>
                <h1>Learner Level</h1>
            </div>
        </div>
      </section>
    </main>
  );
}
