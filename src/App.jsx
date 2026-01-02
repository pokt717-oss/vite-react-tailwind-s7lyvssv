import React, { useState, useEffect } from 'react';
import { Calendar, List, Plus, Trash2, ChevronLeft, ChevronRight, Clock, CheckCircle, AlertCircle } from 'lucide-react';

// D-Day 계산 헬퍼 함수
const getDDay = (targetDate) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(targetDate);
  target.setHours(0, 0, 0, 0);

  const diffTime = target - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "D-Day";
  if (diffDays < 0) return `D+${Math.abs(diffDays)}`;
  return `D-${diffDays}`;
};

const getDaysNumber = (targetDate) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(targetDate);
  target.setHours(0, 0, 0, 0);
  const diffTime = target - today;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

// 색상 팔레트 (구글 캘린더 스타일)
const COLORS = [
  { name: '토마토', value: '#D50000', bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200' },
  { name: '귤색', value: '#F4511E', bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-200' },
  { name: '바나나', value: '#F6BF26', bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-200' },
  { name: '바질', value: '#0B8043', bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200' },
  { name: '블루베리', value: '#3F51B5', bg: 'bg-indigo-100', text: 'text-indigo-700', border: 'border-indigo-200' },
  { name: '포도', value: '#8E24AA', bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-200' },
  { name: '흑연', value: '#616161', bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-200' },
];

export default function ProjectDDayCalendar() {
  const [view, setView] = useState('calendar'); // 'calendar' or 'list'
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // 초기 데이터를 localStorage에서 불러오거나 기본값 사용
  const [projects, setProjects] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('dday-projects');
      if (saved) {
        return JSON.parse(saved);
      }
    }
    return [
      { id: 1, title: '웹사이트 런칭', date: '2025-11-30', color: COLORS[4], description: '메인 페이지 디자인 완료하기' },
      { id: 2, title: '기획안 마감', date: '2025-11-25', color: COLORS[0], description: '최종 컨펌 필요' },
      { id: 3, title: '중간 보고', date: '2025-12-05', color: COLORS[3], description: 'PPT 작성' },
    ];
  });

  // projects 상태가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem('dday-projects', JSON.stringify(projects));
  }, [projects]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({ title: '', date: '', color: COLORS[4], description: '' });

  // 캘린더 날짜 계산 로직
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleAddProject = () => {
    if (!newProject.title || !newProject.date) return;
    setProjects([...projects, { ...newProject, id: Date.now() }]);
    setNewProject({ title: '', date: '', color: COLORS[4], description: '' });
    setIsModalOpen(false);
  };

  const handleDeleteProject = (id) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  // 날짜 포맷팅 (YYYY-MM-DD)
  const formatDate = (date) => {
    const d = new Date(date);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 text-slate-800 font-sans">
      {/* 헤더 */}
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-blue-600 rounded-lg shadow-lg">
             <Calendar className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-800">프로젝트 D-Day 캘린더</h1>
        </div>
        <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setView('calendar')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
              view === 'calendar' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            월간 달력
          </button>
          <button
            onClick={() => setView('list')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
              view === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            D-Day 리스트
          </button>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 shadow-md transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          새 프로젝트
        </button>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="flex-1 overflow-hidden p-6">
        {view === 'calendar' ? (
          <div className="h-full flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* 달력 헤더 */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  {year}년 {month + 1}월
                </h2>
                <div className="flex space-x-1">
                  <button onClick={prevMonth} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  <button onClick={nextMonth} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                오늘: {formatDate(new Date())}
              </div>
            </div>

            {/* 요일 헤더 */}
            <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
              {['일', '월', '화', '수', '목', '금', '토'].map((day, idx) => (
                <div key={day} className={`py-3 text-center text-sm font-semibold ${idx === 0 ? 'text-red-500' : 'text-gray-500'}`}>
                  {day}
                </div>
              ))}
            </div>

            {/* 날짜 그리드 */}
            <div className="flex-1 grid grid-cols-7 auto-rows-fr overflow-y-auto">
              {/* 빈 날짜 채우기 */}
              {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                <div key={`empty-${i}`} className="border-b border-r border-gray-100 bg-gray-50/30" />
              ))}

              {/* 실제 날짜 */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                const isToday = formatDate(new Date()) === dateStr;
                const dayProjects = projects.filter(p => p.date === dateStr);

                return (
                  <div key={day} className={`min-h-[100px] border-b border-r border-gray-100 p-2 relative transition-colors hover:bg-gray-50 ${isToday ? 'bg-blue-50/30' : ''}`}>
                    <div className="flex justify-between items-start mb-1">
                      <span className={`text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full ${isToday ? 'bg-blue-600 text-white' : 'text-gray-700'}`}>
                        {day}
                      </span>
                    </div>
                    
                    <div className="space-y-1">
                      {dayProjects.map(project => {
                         const dDay = getDDay(project.date);
                         return (
                          <div key={project.id} className={`px-2 py-1 rounded text-xs border-l-4 shadow-sm cursor-pointer hover:brightness-95 transition-all truncate flex justify-between items-center ${project.color.bg} ${project.color.text} ${project.color.border}`} style={{borderLeftColor: project.color.value}}>
                            <span className="font-semibold truncate mr-1">{project.title}</span>
                            <span className="font-bold bg-white/50 px-1 rounded text-[10px] whitespace-nowrap">{dDay}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* 리스트 뷰 */
          <div className="max-w-4xl mx-auto h-full overflow-y-auto pr-2">
            <div className="grid gap-4">
              {projects
                .sort((a, b) => getDaysNumber(a.date) - getDaysNumber(b.date))
                .map((project) => {
                  const daysLeft = getDaysNumber(project.date);
                  const isUrgent = daysLeft >= 0 && daysLeft <= 3;
                  const isPast = daysLeft < 0;

                  return (
                    <div key={project.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center justify-between transition-all hover:shadow-md hover:translate-y-[-2px]">
                      <div className="flex items-center space-x-4">
                         <div className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center shadow-inner ${isUrgent ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-gray-100 text-gray-600'}`}>
                            <span className="text-xs font-semibold">D-Day</span>
                            <span className="text-lg font-bold">
                              {getDDay(project.date).replace('D-', '')}
                            </span>
                         </div>
                         <div>
                            <div className="flex items-center space-x-2">
                              <h3 className="text-lg font-bold text-gray-800">{project.title}</h3>
                              {isUrgent && !isPast && (
                                <span className="flex items-center text-xs font-medium text-red-600 bg-red-100 px-2 py-0.5 rounded-full">
                                  <AlertCircle className="w-3 h-3 mr-1" /> 마감 임박
                                </span>
                              )}
                              {isPast && (
                                <span className="flex items-center text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                                  종료됨
                                </span>
                              )}
                            </div>
                            <div className="text-sm text-gray-500 mt-1 flex items-center">
                              <Clock className="w-3 h-3 mr-1" /> {project.date} 마감
                              <span className="mx-2 text-gray-300">|</span>
                              <span className="text-gray-400">{project.description || '설명 없음'}</span>
                            </div>
                         </div>
                      </div>
                      
                      <button 
                        onClick={() => handleDeleteProject(project.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                        title="삭제"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  );
                })}
                
                {projects.length === 0 && (
                  <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                    <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Calendar className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">등록된 프로젝트가 없습니다</h3>
                    <p className="text-gray-500 mt-1">새로운 프로젝트를 추가하여 D-Day를 관리해보세요.</p>
                  </div>
                )}
            </div>
          </div>
        )}
      </main>

      {/* 프로젝트 추가 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 transform transition-all scale-100">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <Plus className="w-5 h-5 mr-2 text-blue-600" />
              새 프로젝트 추가
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">프로젝트명</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="예: 웹사이트 리뉴얼"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">마감일 (D-Day)</label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  value={newProject.date}
                  onChange={(e) => setNewProject({ ...newProject, date: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">설명 (선택)</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="간단한 메모"
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">색상 선택</label>
                <div className="flex justify-between">
                  {COLORS.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setNewProject({ ...newProject, color })}
                      className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${newProject.color.value === color.value ? 'border-gray-900 scale-110' : 'border-transparent'}`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex space-x-3 mt-8">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 font-medium transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleAddProject}
                className="flex-1 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 font-medium shadow-md transition-colors"
              >
                추가하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}