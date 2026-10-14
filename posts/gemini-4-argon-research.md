# Gemini 4 Argon 리서치 노트 (기준일 2026-10-14)

※ 사용자는 "Gemini Argon4"로 검색 요청. 정식 명칭은 "Gemini 4 Argon"(구글 공식). 'Argon'은 공개 제품명 일부.
※ 원문 페이지 직접 열람 실패(검색 요약 기반). 수치는 공식 페이지 재확인 권장.

## 확인된 사실
- 2026-09-30 구글 공식 블로그 발표 "Gemini 4 Argon: our next era of frontier intelligence" — 코딩, 기업 지식업무(법률·금융), 사이버 방어용 프론티어 모델
  - https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-argon/
  - 모델 카드: https://deepmind.google/models/model-cards/gemini-4-argon/
- 기존 Pro 라인보다 큰 모델(구글 대변인, AFP). 6월 예정이던 Gemini 3.5 Pro는 출시 취소. "수개월 지연 끝 발표"
- 1단계(9/30): 사이버보안 방어자 대상 "Fairwind Program" 한정 제공(파트너 650곳+ 보도)
- 2단계(10/13): 일반 공개 확대 — https://blog.google/innovation-and-ai/products/gemini-app/gemini-4-argon-availability/
  - 유료 Gemini API·Google AI Studio (무료 티어 없음)
  - Google AI Pro/Ultra 구독자: Gemini 앱, 검색 AI Mode (순차 적용)
  - Antigravity(데스크톱·CLI): Ultra 및 일부 Gemini Enterprise만. Pro는 Antigravity·AI Studio 불가
  - 출시 시점 Gemini CLI 미지원
- 사양: 입력·출력 모두 1M 토큰 (이전 출력 한도 64K)
- 용도: 장시간·다단계 에이전트 작업(코딩, 금융 리서치, 법률 문서 작성, 자율 취약점 패치). 구글 내부 사례: 데이터센터 메모리 최적화, C/C++→Rust 이전
- 모델 카드: 생물학 분야 위험 임계 능력(CCL) 도달 가능성 배제 못 해 안전장치 적용

## 가격 (API, 100만 토큰당)
- 도입 특가(~2026-11-30): 입력 $2 / 출력 $10 (공식 확인)
- 정가(2026-12-01~): 입력 $4 / 출력 $20, 캐시 입력 $0.20 (다수 매체 보도, 공식표 원문 미열람)
- 1M 토큰 전 구간 동일 단가 (3.1 Pro의 200K 초과 할증 없음)
- 비교: Gemini 3.1 Pro Preview 입력 $2 / 출력 $12. 도입가 Argon은 Opus 5.5의 절반 수준이라는 평(VentureBeat, Neowin)

## 벤치마크 (구글 자체 발표, 독립 검증 X)
| 벤치마크 | Gemini 4 Argon | Claude Opus 5.5 | GPT-6 Astra |
|---|---|---|---|
| DeepSWE v1.1 | 77.9% | 74.2% | 74.1% |
| FrontierSWE v2 | 55.0% | 62.3% | 65.5% |
| Terminal-Bench 4.0 | 57.4% | 66.4% | — |
- 구글 코딩 벤치 4개 중 2개 열세(AFP). DeepSWE는 자체 하네스 측정 논란. SWE-bench Verified·GPQA·HLE 발표표에 없음
- 제3자: Artificial Analysis 지수 Argon 약 52.6~53 (Opus 5.5 57.6, Astra 52.7~53) — 출처별 불일치. 과제당 비용 Argon $1.99 vs Astra $3.26. 출력 토큰 많이 쓰는 편(1.1억 vs 중간값 8,200만)
- Vals Index 41개 모델 중 1위(68.90%)

## 업계 반응 (블로그·포럼 기반, 대표성 제한)
- 긍정: 도입가 저렴, 환각률 낮다는 평. Every의 Dan Shipper "장문 구조 잡는 편집자로 최고, 앱은 아쉽다"
- 부정: HN "기대 이하, 큰 도약 아님". Antigravity는 경쟁 도구 대비 1년 뒤처졌다는 평. 지연·제한적 출시 지적

## 중소기업 실무 포인트 (분석·의견)
1. 도입가 기간(~11/30)은 테스트용으로, 예산은 12월 정가 기준으로
2. 계약서·규정집·대용량 보고서 등 장문 업무에 적합. 단 출력이 길어 실제 비용은 단가보다 커질 수 있음
3. 코딩 에이전트는 아직 Claude/GPT 우세 평가 — 기존 워크플로 즉시 교체 이유 약함
4. 플랜별 이용 범위 상이(Pro=앱만, Antigravity·AI Studio=Ultra/Enterprise). API 무료 티어 없음. Workspace 사용 기업은 앱으로 먼저 체험
5. 벤치마크 대부분 구글 자체 수치 → 자사 업무 샘플로 Claude·GPT와 A/B 테스트 후 결정
6. 한국 이용 가능 여부·한국어 성능은 미확인 (글에서 단정 금지)

## 불확실/미확인 (글에 단정적으로 쓰지 말 것)
- 정가 전환 세부, Vertex 리전, 세부 벤치 수치, 2M 컨텍스트 주장(신뢰 낮음), 한국어 성능
