 {classes.map((cls, index) => (
                        <div key={index} className={` rounded-lg shadow-lg p-4 text-center cursor-pointer transition-transform transform hover:scale-105 hover:shadow-xl ${cls.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            <div className="mb-3">
                                <p className="text-xs text-gray-500">Class</p>
                                <h3 className="text-4xl font-bold text-indigo-600">{cls.class}</h3>
                            </div>
                            <div className="mb-4">
                                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${cls.status ? 'bg-green-300 text-green-800' : 'bg-red-300 text-red-800'}`}>
                                    {cls.status ? 'Taken' : 'Not Taken'}
                                </span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Strength: <span className="font-bold text-gray-700">{cls.strength}</span></p>
                            </div>
                        </div>
                    ))}