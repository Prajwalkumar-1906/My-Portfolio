import os
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors

def create_aiml_resume():
    pdf_path = "public/resumes/Prajwalkumar_Madiwal_AIML_FullStack_Resume.pdf"
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=letter,
        rightMargin=36,
        leftMargin=36,
        topMargin=36,
        bottomMargin=36
    )
    styles = getSampleStyleSheet()
    
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=colors.HexColor('#E50914'),
        spaceAfter=4
    )
    subtitle_style = ParagraphStyle(
        'DocSub',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=14,
        textColor=colors.HexColor('#141414'),
        spaceAfter=6
    )
    contact_style = ParagraphStyle(
        'Contact',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=12,
        textColor=colors.HexColor('#444444'),
        spaceAfter=10
    )
    sec_style = ParagraphStyle(
        'SectionHeading',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=15,
        textColor=colors.HexColor('#E50914'),
        spaceBefore=8,
        spaceAfter=4
    )
    body_style = ParagraphStyle(
        'Body',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=12,
        textColor=colors.HexColor('#222222'),
        spaceAfter=4
    )
    bold_body = ParagraphStyle(
        'BoldBody',
        parent=body_style,
        fontName='Helvetica-Bold'
    )
    bullet_style = ParagraphStyle(
        'Bullet',
        parent=body_style,
        leftIndent=12,
        bulletIndent=4,
        spaceAfter=2
    )

    story = []
    story.append(Paragraph("PRAJWALKUMAR MADIWAL", title_style))
    story.append(Paragraph("AI/ML & Full-Stack Engineer | Final-Year B.E. Computer Science", subtitle_style))
    story.append(Paragraph("Bengaluru, Karnataka, India &bull; pkm.digi@gmail.com &bull; linkedin.com/in/prajwalkumarm &bull; github.com/Prajwalkumar-1906", contact_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor('#E50914'), spaceAfter=8))

    story.append(Paragraph("PROFESSIONAL SUMMARY", sec_style))
    story.append(Paragraph("Final-year Computer Science Engineering student with hands-on experience in AI/ML and full-stack development, building intelligent, data-driven applications. Proficient in Python, machine learning, explainable AI (SHAP), fairness-aware modelling and modern web technologies. Delivered end-to-end projects in AI-powered placement prediction, bias mitigation and real-time expense settlement. Strong problem-solving, product-oriented mindset, hackathon achievements, technical community leadership and public speaking.", body_style))

    story.append(Paragraph("TECHNICAL SKILLS", sec_style))
    story.append(Paragraph("<b>Languages:</b> Python, JavaScript, SQL, C<br/>"
                           "<b>AI & Machine Learning:</b> NumPy, pandas, scikit-learn, PyTorch, TensorFlow, OpenCV, Hugging Face Transformers, LangChain, Prompt Engineering, Explainable AI (SHAP), Fairness-aware ML (Fairlearn), Regression, Classification, Clustering<br/>"
                           "<b>Full-Stack Development:</b> React.js, Next.js, Node.js, Express.js, REST APIs, HTML5, CSS3, Tailwind CSS<br/>"
                           "<b>Databases & Caching:</b> PostgreSQL, MongoDB, Redis, MySQL / MS SQL Server<br/>"
                           "<b>DevOps & Tools:</b> Git/GitHub, Docker, CI/CD (GitHub Actions), AWS basics, Postman, Jupyter<br/>"
                           "<b>Core Computer Science:</b> Data Structures & Algorithms, OOP, DBMS, OS, Computer Networks", body_style))

    story.append(Paragraph("WORK EXPERIENCE", sec_style))
    story.append(Paragraph("<b>AI Intern | ABB, Bengaluru</b> <font color='#666666'>(Sep 2026 - Present)</font>", bold_body))
    story.append(Paragraph("&bull; Contribute to AI/ML solutions for industrial use cases, data preprocessing, EDA, and ML model development.", bullet_style))
    story.append(Paragraph("&bull; Explore integrating AI into industrial workflows for process optimisation; collaborate with cross-functional teams to evaluate technical approaches.", bullet_style))
    
    story.append(Paragraph("<b>AICTE Trainee, AI & ML | Karnataka Social Service Trust (NGO), Remote</b> <font color='#666666'>(Sep 2026 - Present)</font>", bold_body))
    story.append(Paragraph("&bull; Applied machine learning and data engineering practices to community welfare analytics initiatives.", bullet_style))

    story.append(Paragraph("KEY PROJECTS", sec_style))
    story.append(Paragraph("<b>PlaceWise: Explainable & Fair Campus Placement Predictor</b> <font color='#666666'>| Python, XGBoost, SHAP, Fairlearn, Optuna, Streamlit, scikit-learn, pytest</font>", bold_body))
    story.append(Paragraph("&bull; Built leakage-free stratified pipelines on hybrid Kaggle + synthetic bias-injected dataset.", bullet_style))
    story.append(Paragraph("&bull; Implemented SHAP per-student breakdowns and counterfactual explanations; audited gender/college-tier fairness using Fairlearn with ExponentiatedGradient mitigation; 80%+ test coverage.", bullet_style))

    story.append(Paragraph("<b>Chukta: Smart Group-Expense Settlement Platform</b> <font color='#666666'>| Next.js, TypeScript, Node.js/Express, PostgreSQL, Redis, Socket.IO, Docker</font>", bold_body))
    story.append(Paragraph("&bull; Settlement engine with greedy max-heap + bitmask-DP optimal debt minimization; stores currency as integer paise.", bullet_style))
    story.append(Paragraph("&bull; Socket.IO real-time sync load-tested with k6; offline-first PWA; AI chatbot with function calling; tested with fast-check and Playwright in CI.", bullet_style))

    story.append(Paragraph("<b>AI Interview Coach with Real-Time Feedback</b> <font color='#666666'>| IN PROGRESS</font>", bold_body))
    story.append(Paragraph("&bull; Interactive multimodal interview prep platform analyzing answer coherence, technical depth, and response pacing.", bullet_style))

    story.append(Paragraph("EDUCATION & CERTIFICATIONS", sec_style))
    story.append(Paragraph("<b>B.E. Computer Science & Engineering</b> &ndash; Rajarajeswari College of Engineering (RRCE), Bengaluru (2023-2027) &bull; CGPA: 7.7/10", body_style))
    story.append(Paragraph("<b>Senior Secondary (XII), Science</b> &ndash; Tungal PU College, Vijayapura (2021-2023) &bull; 82%", body_style))
    story.append(Paragraph("<b>Certifications:</b> Anthropic (AI Fluency), Google (Gemini Enterprise Application, Fundamentals of Digital Marketing), NVIDIA (AI on Jetson Nano), Oracle (Cloud Infrastructure OCFA)", body_style))

    story.append(Paragraph("ACHIEVEMENTS & LEADERSHIP", sec_style))
    story.append(Paragraph("&bull; <b>Top 5 of 30+ teams</b> at Coding Ninjas Vibe2ship Hackathon (Community Hero platform).<br/>"
                           "&bull; <b>Runner-up, TechPitch at RRCE</b> (SMS Payment System).<br/>"
                           "&bull; <b>Marketing Head & Community Manager, Dream Den Club:</b> Organised GenAI workshop for 100+ students; led 12-member team for inter-college B-plan competition with 300+ participants.<br/>"
                           "&bull; <b>Volunteer:</b> One World One Family (Sathya Sai Mission, coordinated Rs. 50,000+ local education drives) and Annapurna Trust.", body_style))

    doc.build(story)
    print("Created Track 1 Resume PDF")

def create_speaker_kit():
    pdf_path = "public/resumes/Prajwalkumar_Madiwal_Speaker_Kit.pdf"
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=letter,
        rightMargin=36,
        leftMargin=36,
        topMargin=36,
        bottomMargin=36
    )
    styles = getSampleStyleSheet()
    
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=22,
        leading=26,
        textColor=colors.HexColor('#E50914'),
        spaceAfter=4
    )
    subtitle_style = ParagraphStyle(
        'DocSub',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=colors.HexColor('#141414'),
        spaceAfter=8
    )
    body_style = ParagraphStyle(
        'Body',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13,
        textColor=colors.HexColor('#222222'),
        spaceAfter=6
    )
    sec_style = ParagraphStyle(
        'SectionHeading',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=15,
        textColor=colors.HexColor('#E50914'),
        spaceBefore=10,
        spaceAfter=4
    )
    bullet_style = ParagraphStyle(
        'Bullet',
        parent=body_style,
        leftIndent=12,
        bulletIndent=4,
        spaceAfter=3
    )

    story = []
    story.append(Paragraph("PRAJWALKUMAR MADIWAL", title_style))
    story.append(Paragraph("SPEAKER KIT & PROFESSIONAL BIO", subtitle_style))
    story.append(Paragraph("Bengaluru, India &bull; Email: pkm.digi@gmail.com &bull; LinkedIn: linkedin.com/in/prajwalkumarm &bull; 8K+ Followers", body_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor('#E50914'), spaceAfter=8))

    story.append(Paragraph("EXECUTIVE SPEAKER BIOGRAPHY", sec_style))
    story.append(Paragraph("Prajwalkumar Madiwal is a multi-disciplinary public speaker, AI researcher, and community leader based in Bengaluru. Currently an AI Intern at ABB and final-year Computer Science Engineering scholar at RRCE, Prajwal combines technical mastery in Artificial Intelligence with high-impact communication. Having delivered sessions for hundreds of learners and led flagship entrepreneurial initiatives, Prajwal delivers high-energy keynote talks and deep-dive technical workshops designed to empower next-generation engineers and business minds.", body_style))

    story.append(Paragraph("SPEAKING & TRAINING OFFERINGS", sec_style))
    story.append(Paragraph("&bull; <b>AI & Software Technology Sessions:</b> Demystifying Generative AI, Explainable ML (SHAP), and building production-ready architectures.<br/>"
                           "&bull; <b>Career Development & Resume Mastery:</b> Tactical resume reviews, interview perception coaching, and high-impact placement preparation.<br/>"
                           "&bull; <b>Product & Digital Marketing for Tech:</b> Turning engineering ideas into viable products with go-to-market strategies.<br/>"
                           "&bull; <b>Keynotes & Leadership:</b> Youth leadership, hackathon mindset, and social-impact engineering.", body_style))

    story.append(Paragraph("WHERE I SPEAK", sec_style))
    story.append(Paragraph("Colleges &bull; Schools &bull; Universities &bull; Tech Parks &bull; Open-Air Theatres &bull; Corporate Events &bull; Meetups & Hackathons", body_style))

    story.append(Paragraph("SELECTED PROOF OF IMPACT", sec_style))
    story.append(Paragraph("&bull; <b>GenAI Workshop Lead:</b> Organised and delivered a hands-on GenAI workshop for 100+ students under the Dream Den Club.<br/>"
                           "&bull; <b>Flagship B-Plan Leadership:</b> Spearheaded a 12-member team organising an inter-college business plan competition with 300+ participants.<br/>"
                           "&bull; <b>National Hackathon Finalist:</b> Ranked Top 5 of 30+ teams at the Coding Ninjas Vibe2ship Hackathon.<br/>"
                           "&bull; <b>Social Mission Coordinator:</b> Directed fundraising initiatives raising over Rs. 50,000 for local children's education via One World One Family.", bullet_style))

    story.append(Paragraph("ENGAGEMENT DETAILS & BOOKINGS", sec_style))
    story.append(Paragraph("Fees are per session and vary by location, audience size, and travel requirements. Available for both in-person (pan-India) and global virtual engagements. To request availability and a customized quote, submit via the online portfolio at <b>/sessions</b> or email directly at <b>pkm.digi@gmail.com</b>.", body_style))

    doc.build(story)
    print("Created Speaker Kit PDF")

def create_combined_resume():
    pdf_path = "public/resumes/Prajwalkumar_Madiwal_Complete_Portfolio.pdf"
    # Copy or build combined
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=letter,
        rightMargin=36,
        leftMargin=36,
        topMargin=36,
        bottomMargin=36
    )
    styles = getSampleStyleSheet()
    title_style = ParagraphStyle('T', parent=styles['Heading1'], fontName='Helvetica-Bold', fontSize=18, textColor=colors.HexColor('#E50914'), spaceAfter=4)
    sec_style = ParagraphStyle('S', parent=styles['Heading2'], fontName='Helvetica-Bold', fontSize=11, textColor=colors.HexColor('#E50914'), spaceBefore=8, spaceAfter=2)
    b_style = ParagraphStyle('B', parent=styles['Normal'], fontName='Helvetica', fontSize=8.5, leading=11, textColor=colors.HexColor('#222222'), spaceAfter=3)

    story = [
        Paragraph("PRAJWALKUMAR MADIWAL &ndash; COMPREHENSIVE DOSSIER", title_style),
        Paragraph("AI/ML & Full-Stack Engineer | Data & Business Analyst | Bengaluru, India &bull; pkm.digi@gmail.com", b_style),
        HRFlowable(width="100%", thickness=1, color=colors.HexColor('#E50914'), spaceAfter=6),
        Paragraph("SEASON 1: AI/ML & FULL-STACK ENGINEERING", sec_style),
        Paragraph("Final-year CSE student with practical expertise in AI/ML (PyTorch, scikit-learn, XGBoost, SHAP, Fairlearn) and Modern Web (Next.js, React, Node.js, PostgreSQL, Redis, Docker). Experience at ABB (AI Intern) and Karnataka Social Service Trust.", b_style),
        Paragraph("SEASON 2: DATA & BUSINESS ANALYTICS", sec_style),
        Paragraph("Data Analytics & Business Development Associate with proven traction: 150+ leads/month via LinkedIn Sales Navigator (+12% sales pipeline), 10+ client pitch decks (+20% proposal conversion) at Galaxy Systems, plus market research with 200+ campus respondents at Dream Den Community.", b_style),
        Paragraph("SERVICES OFFERED", sec_style),
        Paragraph("Public Speaking, Training & Workshops, Resume Review, Interview Perception / Mock Interviews, Career Development Coaching, Life Coaching, Product Marketing, Digital Marketing, Enterprise Content Management, Ghost Writing, AI & Software Technology Sessions.", b_style),
        Paragraph("CREDENTIALS & EDUCATION", sec_style),
        Paragraph("B.E. CSE at Rajarajeswari College of Engineering (2023-2027, CGPA 7.7) &bull; Tungal PU College (2021-2023, 82%) &bull; Sathya Sai Grama.<br/>Certifications: Anthropic AI Fluency, Google Gemini Enterprise, NVIDIA Jetson Nano AI, Oracle Cloud Infrastructure OCFA, Salesforce CRM Fundamentals, Macquarie University Excel Skills for Business.", b_style)
    ]
    doc.build(story)
    print("Created Combined Portfolio PDF")

if __name__ == "__main__":
    create_aiml_resume()
    create_speaker_kit()
    create_combined_resume()
