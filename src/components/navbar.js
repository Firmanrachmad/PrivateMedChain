import '../App.css';

function Navbar(){
    return (
            <div>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/test">Test MongoDB</a></li>
                    <li><a href="/upload">Upload File to MongoDB</a></li>
                    <li><a href="/transactions">View Transactions</a></li>
                </ul>
            </div>
    )

}

export default Navbar