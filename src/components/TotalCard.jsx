function TotalCard({ number, name, subName, color }) {
    return (
        <div className="total-card" style={{ color: color }}>
            <div>
                <h1>{number}</h1>
                <span>{name}</span>
            </div>
            <span>{subName}</span>
        </div>
    )
}

export default TotalCard
